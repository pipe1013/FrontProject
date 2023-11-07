import { css } from "lit-element";

export default css`

.container {
    position: relative;
}

.content {
    background-color: #3498db;
    color: #fff;
    padding: 20px;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
    text-align: center;
    position: relative;
}

.info {
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
    padding: 10px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: none;
    border-radius: 10px;
    opacity: 0;
    transition: opacity 0.3s, background-color 0.5s;
}

.content:hover {
    background-color: #2980b9;
}

.content:hover .info {
    display: block;
    opacity: 1;
}

.m-100{
    margin:100px;
}
.div-icon-border{
    background-color: #3498db; 
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
}

.border-50{
    border:1px solid black;
    border-radius:50px;
}
.bg-blue1{
    background-color:#265D80;
    transition:0.5s
}
.bg-blue1:hover{
    background-color:gray;
}



`