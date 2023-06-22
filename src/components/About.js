import React from 'react';


export default function About() {

    return (
        <div className="container my-4">
            <h2>What this application does?</h2>
            <div>Welcome to Cloud Notebook, I created this application while learning MERN Stack. This is a basic Application with little efforts on backend as well as frontend.
                <br />Maybe looking forward to add some new features in this application in future. Keep visiting my github, more complex projects will come in future.
            </div>
            <h2>Future Updates?</h2>
            <div>I maybe working on this project again but for this time, thats it. <br />
                I have some features to implement on this application and maybe implement them sometime. <br />
                Some feature in my mind:
                <ul>
                    <li>Option to Search Notes with particular tag</li>
                    <li>Drag and Drop delete Notes</li>
                </ul>
            </div>
            <h4 className="my-4">&#129505; Thanks For Visiting! &#129505;</h4>
        </div>
    )
}
