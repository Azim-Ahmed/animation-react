import React from 'react'
import { Link } from 'react-router-dom'

const HeaderRouting = () => {
    return (
        <div>
            <h1 style={{ textAlign: "center" }}>
                <Link to="/">React Components Based Application</Link>
            </h1>
            <ul style={{
                background: "rgb(255,255,250)",
                padding: "1.5rem",
                boxShadow: "1px 1px 10px gray",
                display: "flex",
                justifyContent: "space-around"
            }}
            >

                <Link to="/BeautifulDragAndDrop">BeautifulDragAndDrop</Link>
                <Link to="/SimpleAnimation">SimpleAnimation</Link>
                <Link to="/SimpleAnimatedKeyFrames">SimpleAnimatedKeyFrames</Link>
                <Link to="/InputData">InputData</Link>
                <Link to="/ReactSpringDemoOne">ReactSpringDemoOne</Link>
                <Link to="/ReactSpringDemoTwo">ReactSpringDemoTwo</Link>
                <Link to="/FrequentQuestions">FrequentQuestions</Link>

            </ul>
        </div>
    )
}

export default HeaderRouting
