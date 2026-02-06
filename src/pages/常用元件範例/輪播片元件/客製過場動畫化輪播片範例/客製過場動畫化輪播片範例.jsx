

import './_客製過場動畫化輪播片範例.scss';
import { useState } from 'react'

export default function 客製過場動畫化輪播片範例() {

    //#region
    //#endregion

    const [index, setIndex] = useState(0)
    const [animating, setAnimating] = useState(false)

    const slides = [
        { title: 'Slide 1', color: '#222' },
        { title: 'Slide 2', color: '#f5c400' },
        { title: 'Slide 3', color: '#4a90e2' },
    ]

    const next = () => {
        if (animating) return
        setAnimating(true)

        setTimeout(() => {
        setIndex((i) => (i + 1) % slides.length)
        }, 600)

        setTimeout(() => {
        setAnimating(false)
        }, 1200)
    }

    return (
        <div className="客製過場動畫化輪播片範例">
            <div className="slider">
            <div className="content">
                <h1>{slides[index].title}</h1>
            </div>

            {animating && (
                <>
                <div className="overlay black" />
                <div className="overlay yellow" />
                </>
            )}

            <button onClick={next}>Next</button>
            </div>
        </div>
    );
}
