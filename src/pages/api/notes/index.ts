// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getAllNotes, postNote } from "@/server/controllers/NotesController"
// handle server error middleware
import onError from "@/server/middlewares/errors"
import nc from "next-connect"

// import the notes controller for postingNotes and fetching all notes

// initiate next-connect with error middleware
const handler = nc({ onError })

// handler request from "api/notes" endpoint
// handle post request for posting a note
handler.get(getAllNotes)
// handle post request for posting a note
handler.post(postNote)

export default handler


