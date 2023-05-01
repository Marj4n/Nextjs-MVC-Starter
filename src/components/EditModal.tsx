import React, { useState } from "react"
import { NoteType } from "@/types/note"
import { X } from "lucide-react"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

interface editProps {
  onHandleEditNote: (note: NoteType) => void
  selectEditedNote: NoteType | undefined
  showUpdateModal: boolean
  setSelectEditedNote: React.Dispatch<
    React.SetStateAction<NoteType | undefined>
  >
  setUpdateModalVisibility: (visibility: boolean) => void
}

const EditModal = ({
  onHandleEditNote,
  selectEditedNote,
  showUpdateModal,
  setSelectEditedNote,
  setUpdateModalVisibility,
}: editProps) => {
  const [title, setTitle] = useState<string | undefined>(
    selectEditedNote?.title
  )
  const [content, setContent] = useState<string | undefined>(
    selectEditedNote?.content
  )
  const [color, setColor] = useState<string | undefined>(
    selectEditedNote?.color || "#F9A8D4"
  )

  // handle event
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    onHandleEditNote({ title, content, color })
    setUpdateModalVisibility(!showUpdateModal)
    setTitle("")
    setContent("")
  }
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div className="w-96">
          {/*content*/}
          <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
              <h3 className="text-3xl font-semibold dark:text-black">
                Edit Note
              </h3>
              <Button
                className="text-2xl leading-none font-semibold outline-none focus:outline-none dark:text-black"
                onClick={() => setUpdateModalVisibility(!showUpdateModal)}
              >
                <X />
              </Button>
            </div>
            {/*body*/}
            <div className="relative flex-auto p-6">
              <form>
                <div className="mb-4">
                  <Label
                    className="mb-2 block text-sm font-bold text-gray-700"
                    htmlFor="username"
                  >
                    Title
                  </Label>
                  <Input
                    className="mb-3 w-full appearance-none rounded border leading-tight text-gray-700 shadow focus:outline-none dark:focus:outline-none"
                    id="title"
                    type="text"
                    placeholder="Title"
                    value={title}
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <Label
                    className="mb-2 block text-sm font-bold text-gray-700"
                    htmlFor="password"
                  >
                    Content
                  </Label>
                  <Input
                    className="focus:shadow-outline mb-3 w-full  appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                    id="content"
                    type="text"
                    value={content}
                    name="content"
                    onChange={(e) => setContent(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <Label className="mb-2 block text-sm font-bold text-gray-700">
                    Pick Note Color
                  </Label>
                  <Input
                    className="focus:shadow-outline mb-3 w-full appearance-none rounded  border leading-tight text-gray-700 shadow focus:outline-none"
                    id="color"
                    type="color"
                    value={color}
                    name="content"
                    onChange={(e) => setColor(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Button
                    onClick={(e) => handleSubmit(e)}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                    type="submit"
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25 dark:bg-gray-600"></div>
    </>
  )
}

export default EditModal
