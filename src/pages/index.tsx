import React, { Key, useEffect, useId, useState } from "react"
import { GetServerSideProps } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import AddModal from "@/components/AddModal"
import EditModal from "@/components/EditModal"
import Layout from "@/components/Layout"
import StickyNote from "@/components/StickyNote"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { NoteType } from "@/types/note"
import axios from "axios"
import { PlusIcon } from "lucide-react"
import absoluteUrl from "next-absolute-url"

type IndexProps = {
  results: NoteType[]
}

export const Index = ({ results }: IndexProps): JSX.Element => {
  const [notes, setNotes] = useState(results)
  const [showAddModal, setAddModalVisibility] = useState<boolean>(false)
  const [showUpdateModal, setUpdateModalVisibility] = useState<boolean>(false)
  const [selectEditedNote, setSelectEditedNote] = useState<NoteType>()
  const router = useRouter()
  const tempPostId = useId()

  const handleAddNote = async ({ title, content, color }: NoteType) => {
    // add Note optimistically to ui
    let oldNotesState = notes
    try {
      const addNotes = [
        ...notes,
        {
          id: tempPostId,
          title,
          content,
          color,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]
      setNotes(addNotes)
      const { data } = await axios.post(`/api/notes`, { title, content, color })
      // router.reload();
    } catch (error) {
      console.error(error)
      setNotes(oldNotesState)
    }
  }

  const handleEditNote = async ({ title, content, color, id }: NoteType) => {
    // add Note optimistically to ui
    let oldNotesState = notes
    try {
      const editNotes = notes.map((note) => {
        if (note.id === selectEditedNote?.id) {
          return {
            ...note,
            title,
            content,
            color,
            updatedAt: new Date(),
          }
        }
        return note
      })
      setNotes(editNotes)

      const { data } = await axios.put(`/api/notes/${selectEditedNote?.id}`, {
        id: selectEditedNote?.id,
        title,
        content,
        color,
      })
      // if (data) {
      //   router.reload();
      // }
      setUpdateModalVisibility(!showUpdateModal)
      setSelectEditedNote(undefined)
    } catch (error) {
      setNotes(oldNotesState)
      console.error(error)
    }
  }

  const handleSelectEditedNote = (selectNote: NoteType) => {
    setSelectEditedNote(selectNote)
    setUpdateModalVisibility(!showUpdateModal)
  }

  const handleDeleteNote = async (id: string) => {
    //delete note base on id
    const removeItem = notes.filter((note) => note.id !== id)
    setNotes(removeItem)
    try {
      await axios.delete(`/api/notes/${id}`)
      router.reload()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => console.log(results), [results])

  return (
    <Layout>
      <h1>Home Page</h1>
      <p>Next.js starter for your next blog or personal site. Built with:</p>
      <ul className="my-6 list-disc pl-4">
        <li>
          <a
            href={"https://nextjs.org/"}
            className="text-gray-900 dark:text-white"
          >
            Next.js
          </a>
        </li>
        <li className="mt-2">
          <a
            href={"https://www.typescriptlang.org/"}
            className="text-gray-900 dark:text-white"
          >
            Typescript
          </a>
        </li>
        <li className="mt-2">
          <a
            href={"https://mdxjs.com/"}
            className="text-gray-900 dark:text-white"
          >
            MDX
          </a>
        </li>
        <li className="mt-2">
          <a
            className="text-gray-900 dark:text-white"
            href={"https://tailwindcss.com/"}
          >
            Tailwind CSS
          </a>
        </li>
        <li className="mt-2">
          <a
            className="text-gray-900 dark:text-white"
            href={"https://ui.shadcn.com/"}
          >
            Shadcn
          </a>
        </li>
      </ul>
      <Link
        className="mr-6"
        href="https://github.com/Marjannnnnn/nextjs-typescript-mdx-blog-starter"
      >
        <Button
          variant="default"
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          Get the source code!
        </Button>
      </Link>
      <Link href="/posts/create">
        <Button variant="outline">Create Post</Button>
      </Link>
      <main className="main">
        {showAddModal && (
          <AddModal
            onHandleAddNote={handleAddNote}
            showAddModal={showAddModal}
            setAddModalVisibility={setAddModalVisibility}
          />
        )}
        {showUpdateModal && (
          <EditModal
            onHandleEditNote={handleEditNote}
            setSelectEditedNote={setSelectEditedNote}
            selectEditedNote={selectEditedNote}
            showUpdateModal={showUpdateModal}
            setUpdateModalVisibility={setUpdateModalVisibility}
          />
        )}
        <Button
          onClick={() => setAddModalVisibility(!showAddModal)}
          className="gap-2"
        >
          Add Note <span className="pb-1 text-3xl">+</span>
        </Button>
        <div className="mt-10 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {notes?.map((note: NoteType, index: Key | null | undefined) => (
            <StickyNote
              key={index}
              data={note}
              onSelectEditedNote={handleSelectEditedNote}
              onDeleteNote={handleDeleteNote}
            />
          ))}
        </div>
      </main>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { origin } = absoluteUrl(req)
  const apiURL = `${origin}/api/notes`
  const { data } = await axios.get(apiURL)
  return {
    props: {
      results: data.data.notes,
    },
  }
}

export default Index
