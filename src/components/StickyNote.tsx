import React from "react"
import { NoteType } from "@/types/note"

import { Icons } from "./icons"

interface Props {
  data: NoteType
  onSelectEditedNote: (selectNote: NoteType) => void
  onDeleteNote: (id: string) => Promise<void>
}

const StickyNote = ({ data, onSelectEditedNote, onDeleteNote }: Props) => {
  const { id, title, content, color, createdAt } = data
  return (
    <div
      className={`w-54 mb-6 flex h-64 -rotate-1  flex-col justify-between  rounded-lg border px-4 py-5 shadow-md`}
      style={{ backgroundColor: color }}
    >
      <div className="">
        <div className="flex">
          <div className="w-32">
            <h4 className="mb-3 font-bold text-gray-900">{title}</h4>
          </div>
          <button onClick={() => onDeleteNote(id!)} className="float-right">
            <Icons.deleteIcon className="h-8 w-8 hover:scale-125" />
          </button>
        </div>
        <p className="text-sm text-gray-800">{content}</p>
      </div>
      <div>
        <div className="flex items-center justify-between text-gray-800">
          <p className="text-sm">{new Date(createdAt!).toDateString()}</p>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-white ring-offset-pink-300 hover:scale-125 focus:outline-none focus:ring-2   focus:ring-black focus:ring-offset-2"
            aria-label="edit note"
            onClick={() => onSelectEditedNote(data)}
            role="button"
          >
            <Icons.editIcon className="icon icon-tabler icon-tabler-pencil hover:scale-125" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default StickyNote
