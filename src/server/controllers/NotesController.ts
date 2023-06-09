// import the catchError middleware

import { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/lib/prisma"

import catchAsyncErrors from "../middlewares/catchAsyncErrors"

// prisma client

// route for fetching all notes
const getAllNotes = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const notes = await prisma.note.findMany()

    res.status(200).json({
      message: "Success fetching all notes.",
      data: {
        notes,
      },
    })
  }
)

// route for post a note
const postNote = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { title, content, color } = req.body
    const note = await prisma.note.create({
      data: {
        title,
        content,
        color,
      },
    })
    res.status(200).json({
      status: "Success posting a note.",
      data: note,
    })
  }
)

// route for deleting through a note id request dynamically
const deleteNote = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query
    await prisma.note.delete({
      where: {
        id: Number(id),
      },
    })

    res.status(200).json({
      status: "Success deleting a note.",
      data: null,
    })
  }
)

// get one note from with a note id request dynamically
const getNote = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.body
    const note = await prisma.note.findUnique({
      where: {
        id: id,
      },
    })

    res.status(200).json({
      status: "Success getting a note.",
      data: {
        note,
      },
    })
  }
)

// update a note from with a note id request dynamically
const updateNote = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.body
    const { title, content, color } = req.body

    const note = await prisma.note.update({
      where: {
        id: id,
      },
      data: {
        title,
        content,
        color,
      },
    })
    res.status(200).json({
      status: "Success updating a note.",
      data: {
        note,
      },
    })
  }
)

// export all routes to be used in the api/
export { getAllNotes, postNote, deleteNote, updateNote, getNote }
