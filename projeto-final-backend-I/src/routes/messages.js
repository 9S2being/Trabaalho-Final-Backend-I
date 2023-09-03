import express from "express";
import { v4 as uuidv4 } from 'uuid';
import { users } from "./users";

const messageRoutes = express.Router();

const messages = [];

//============================================================

///Criação de mensagem

messageRoutes.post("/criar", (req, res) => {
    const { title, description, userId } = req.body
  
    const verificarUserId = users.find(user => user.id === userId)
  
    if (!verificarUserId) {
      return res.status(404).json({
        message: "User not found"
      })
    }
  
    const newMessage = {
      id: uuidv4(),
      title,
      description,
      userId
    }
  
    messages.push(newMessage)
  
    res.status(201).json({
      message: "Message created",
      newMessage
    })
  })

///===========================================================

///Listagem de mensagem 

messageRoutes.get("/listar/:userId", (req, res) => {
    const { userId } = req.params
  
    const verificarUserId = users.find(user => user.id === userId)
  
    if (!verificarUserId) {
      return res.status(404).json({
        message: "User not found"
      })
    }
  
    const userMessages = messages.filter(message => message.userId === userId)
  
    res.status(200).json(userMessages)
  })

///===========================================================

///Atualização de mensagem

messageRoutes.put("/atualizar/:messageId", (req, res) => {
    const { messageId } = req.params
    const { title, description } = req.body
  
    const messageIndex = messages.findIndex(message => message.id === messageId)
  
    if (messageIndex === -1) {
      return res.status(404).json({
        message: "Message not found."
      })
    }
  
    messages[messageIndex].title = title
    messages[messageIndex].description = description
  
    res.status(200).json({
      message: "Message updated"
    })
  })

///===========================================================

///Exclusão de mensagem 

messageRoutes.delete("/deletar/:messageId", (req, res) => {
    const { messageId } = req.params
  
    const messageIndex = messages.findIndex(message => message.id === messageId)
  
    if (messageIndex === -1) {
      return res.status(404).json({
        message: "message not found"
      })
    }
  
    const deletedMessage = messages.splice(messageIndex, 1)
  
    res.status(200).json({
      message: "Message Deleted",
      deletedMessage
    })
  })

///===========================================================

export {messageRoutes};
