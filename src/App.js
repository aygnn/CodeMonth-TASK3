import "./App.scss";
import { useEffect, useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { v4 as uuidv4 } from "uuid";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function App() {
  const [toDos, setToDos] = useState([]);
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");
  const [toDoEdit, setToDoEdit] = useState();

  useEffect(() => {
    const storedToDos = sessionStorage.getItem('toDos');
    if (storedToDos) {
      setToDos(JSON.parse(storedToDos));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('toDos', JSON.stringify(toDos));
  }, [toDos]);
  const handleChange1 = (e) => {
    setText(e.target.value);
   
  };
  const handleChange2 = (e) => {
    setText2(e.target.value);
   
  };
  const handleEdit =(todo)=>{
    setToDoEdit(todo)
    setText(todo.text)
    setText2(todo.title)

  }
  const handleSubmit = (e) => {
  
    e.preventDefault();

    if  (text && text2) {
      if(toDoEdit){
        const updateitem=toDos.map((item)=>{
          if(item.id===toDoEdit.id){
            
            return{...item,text:text,title:text2}
          }
          console.log(item,"update title");
          return item
     
        })
        setToDos(updateitem)
        setToDoEdit(null)
        setText("");
        setText2("");
      }
      else{
        const newItem = {
          id: uuidv4().substring(0, 5),
          text: text,
          title: text2,
          isDone: false,
        };
        const newtodo = [...toDos, newItem];
          setToDos(newtodo);
          console.log(newItem,"new title");

      }
      setText("");
    setText2("");

    }
     else {
      alert("Fill in the input!");
    }


  
  };
  const handleDelete =(id)=>{
    const otheritem=toDos.filter(x=>x.id!==id)
    setToDos(otheritem)

  }
  const DeleteAll=()=>{
    setToDos([  ])
    console.log(toDos);
  }


  return (
    <div className="App">
      <div className="title">
        <h3>To Do Application</h3>
      </div>

      <div className="input-area">
        <form onSubmit={handleSubmit}>
        <div className="name">
          
            <TextField  label="Title" 
            id="title"
              value={text2}
              onChange={handleChange2}
            /> 
         
        </div>
        <div className="todo">
        
            <TextField  label="To Do" 
            id="todo"
              value={text}
              onChange={handleChange1}
            />
       
        </div>
        <div className="add-button">
        
          <input  className="button-37" type="submit" value={toDoEdit ?"Save" : "Add"}/>
                {toDoEdit ? <button className="button-24" onClick={()=>{
            setToDoEdit(null)
            setText("")
            setText2("")
        }}>Cancel</button> : ""}
       
        </div>
        </form>
     
      </div>

      <div className="todo-table">
        <div className="delete-all">
          <Stack direction="row" spacing={2}>
            <Button onClick={DeleteAll} variant="outlined" startIcon={<DeleteIcon />} color="error">
              DELETE ALL
            </Button>
          </Stack>
        </div>

        <div className="main-table">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell align="right"> Description</StyledTableCell>
                  <StyledTableCell align="right">Status</StyledTableCell>
                  <StyledTableCell align="right">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {toDos.map((todo, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {todo.title}
                    </StyledTableCell>
                    <StyledTableCell align="right">{todo.text}</StyledTableCell>
                    <StyledTableCell align="right">
                      <div className="checkbox-wrapper-11">
                        <input id="02-11" type="checkbox" name="r" value="2" />
                        <label htmlFor="02-11">To-do</label>
                      </div>
                    </StyledTableCell>
                    <StyledTableCell className="action" align="right">
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <IconButton
                        onClick={() => handleEdit(todo)}
                          className="update"
                          aria-label="delete"
                          size="large"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(todo.id)} className="sil"  aria-label="delete"  size="large">
                          <DeleteIcon    />
                        </IconButton>
                      </Stack>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default App;
