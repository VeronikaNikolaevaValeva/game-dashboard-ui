import Header from "./Header";
import React, { Component }  from 'react';

function PageLayout(props){ 

    return (
        <div className="bg-dark text-white">
            <Header />
            <main className="bg-dark text-white">
                {props.children}
            </main>
        </div>
    );
}

export default PageLayout;