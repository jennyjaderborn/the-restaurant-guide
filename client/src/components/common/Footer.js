import React from 'react';
import styled from 'styled-components';
import { FaRegCopyright } from 'react-icons/fa';



// Component
 const Footer = () => {
      
        return (
            <Container>
            <div className="kontaktUppgifter">
                <p>Restaurangguiden</p>
                <p>info@rkartan.se</p>
                <p>031 21 32 43</p>
            </div>
            <div className="minalänkar">
            <div className="sträck"></div>
            <div className="länkar">
                  <p>Policy</p>
                  <p>Om oss</p>
            </div>
            <div className="sträck"></div>
            <div className="länkar">
                  <p className="copyright"><FaRegCopyright/>restaurangkartan 2018</p>
                </div>
            </div>
        </Container>     
    )
}


export default Footer; 

const Container = styled.div `
    height: 200px;
    background-color: rgb(56, 57, 58);
    color: white;
    max-width: 100%;
    font-size: 14px;
    display:flex;
    align-items: center;
    justify-content: space-around;
    margin-top:60px;
    /*font-family: 'Source Sans Pro', sans-serif;*/
    font-family: 'Yantramanav';
    @media all and (max-width: 800px) {
        justify-content: space-between;
        height: 150px;
        /*background: blue;*/
        margin: 0px;
        padding: 0px 10px;
    }
    @media all and (max-width: 375px) {
        flex-direction: column;
        justify-content: center;
        height: 200px;
        /*background: blue;*/
        margin: 0px;
        padding: 0px;
    }
  
.copyright {
    display:flex; 
    align-items: center;
}
.kontaktUppgifter {
    width: 25%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-left: 5%;
    @media all and (max-width: 800px) {
        /*background: yellow;*/
        width: 50%;
    }
    @media all and (max-width: 375px) {
        width: 100%;
        align-items: center;
    }
}
.sträck {
    height: 100px;
    width: 1px;
    background-color: #A19D9D;
    opacity: 0.2;
    border-radius: 50%;
    @media all and (max-width: 800px) {
        height: 0px;
        width: 0px;
    }
}
.minalänkar {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 75%;
    @media all and (max-width: 800px) {
        display: flex;
        flex-direction: column;
        /*background:green;*/
        width: 50%;
    }
     @media all and (max-width: 375px) {
        width: 100%;
        align-items: center;
        flex-direction: column;
}
.länkar{
        @media all and (max-width: 800px) {
            /*background: red;*/
        }
        
    }
    
`
