const express=require('express')
const app=express()
const cors=require('cors')
let notes = [
    {
      id: "1",
      content: "HTML is easy",
      important: true
    },
    {
      id: "2",
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: "3",
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

/*
app.post('/api/notes',(request,response)=>{
  const maxId=notes.length>0
  ?Math.max(...notes.map(n=>Number(n.id)))
  :0
  const note=request.body
  note.id=String(maxId+1)
  
  notes=notes.concat(note)

  response.json(note)
})

const PORT=3001
app.listen(PORT,()=>{
  console.log(`Server started on port ${PORT}`)
})
  */
const generateid=()=>{
  const maxid=notes.length>0
  ?Math.max(...notes.map(n=>Number(n.id)))
  :0
  return (maxid+1)
}

app.post('/api/notes',(request,response)=>{
  const body=request.body
  if(!body.content)
  {
    return response.status(400).json({error:'content missing'})
  }
  const note={
    id:generateid(),
    content:body.content,
    important:Boolean(body.important)||false
  }
  notes=notes.concat(note)
  response.json(note)
})
app.get('/api/notes',(request,response)=>{
  response.status(200).send(notes)
})
const PORT=process.env.PORT||3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
