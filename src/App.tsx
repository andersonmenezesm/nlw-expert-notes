import { ChangeEvent, useState } from 'react'
import logo from './assets/logo-nwl-expert.svg'
import { NewNoteCard } from './components/new-note-card'
import { NoteCard } from './components/note-card'

interface Note {
  id: string
  date: Date
  content: string
}

export function App() {
  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem('notes')

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage)
    }

    return []
  })

  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    }

    const notesColection = [newNote, ...notes]

    setNotes(notesColection)

    localStorage.setItem('notes', JSON.stringify(notesColection))
  }

  function onDeleteNote(noteId: string) {
    const notesOnDelete = notes.filter((note) => note.id !== noteId)

    setNotes([...notesOnDelete])

    localStorage.setItem('notes', JSON.stringify(notesOnDelete))
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value.toLowerCase()

    setSearch(query)
  }

  const filteredNotes =
    search !== '' ? notes.filter((note) => note.content.toLowerCase().includes(search.toLowerCase())) : notes

  return (
    <div className="mx-auto my-12 max-w-6xl space-y-6 px-5">
      <img
        src={logo}
        alt="NLW Expert"
      />
      <form className="mt-6 w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
          onChange={handleSearch}
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid auto-rows-[250px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <NewNoteCard onNoteCreated={onNoteCreated} />

        {filteredNotes.map((note) => {
          return (
            <NoteCard
              key={note.id}
              note={note}
              onDeleteNote={onDeleteNote}
            />
          )
        })}
      </div>
    </div>
  )
}
