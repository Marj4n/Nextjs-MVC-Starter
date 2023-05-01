// import the notes controller for postingNotes and fetching all notes
import {
  deleteNote,
  getNote,
  updateNote,
} from "@/server/controllers/NotesController"
// handle server error middleware
import onError from "@/server/middlewares/errors"
import nc from "next-connect"

const handler = nc({ onError })

// get a single note
handler.get(getNote)
// update a single note
handler.put(updateNote)
// delete a single note
handler.delete(deleteNote)

export default handler
