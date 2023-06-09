import React, { useState } from "react"
import { NoteType } from "@/types/note"
import { X } from "lucide-react"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"

type Props = {
  onHandleAddNote: (note: NoteType) => void
  showAddModal: boolean
  setAddModalVisibility: React.Dispatch<React.SetStateAction<boolean>>
}

const AddModal = ({
  onHandleAddNote,
  showAddModal,
  setAddModalVisibility,
}: Props) => {
  // handle field data
  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [color, setColor] = useState<string>("#F9A8D4")

  // handle on submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onHandleAddNote({
      title,
      content,
      color,
    })
    setTitle("")
    setContent("")
    setAddModalVisibility(!showAddModal)
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
                Add Note
              </h3>
              <Button
                className="text-2xl font-semibold leading-none outline-none focus:outline-none dark:text-black"
                onClick={() => setAddModalVisibility(!showAddModal)}
              >
                <X />
              </Button>
            </div>
            {/*body*/}
            <div className="relative flex-auto p-6">
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-4">
                  <Label className="mb-2 block text-sm font-bold text-gray-700">
                    Title
                  </Label>
                  <Input
                    className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
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
                  <Label className="mb-2 block text-sm font-bold text-gray-700">
                    Content
                  </Label>
                  <Textarea
                    className="focus:shadow-outline mb-3 w-full  appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                    id="content"
                    rows={4}
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
                    type="submit"
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  )
}

export default AddModal
