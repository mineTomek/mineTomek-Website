import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink, faQuoteRight } from '@fortawesome/free-solid-svg-icons'
import styles from '@/styles/PostCard.module.css'
import React, { FC } from 'react'

type Props = {
    name: string,
    link: string,
    description: string,
    imageSrc: string
}

const PostCard: FC<Props> = (props) => {
    return (
        <a
            href={props.link}
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
        >
            <h2>
                {props.name} <span><FontAwesomeIcon icon={faQuoteRight} style={{color: "#ccc"}} /></span>
            </h2>
            <p>
                {props.description}
            </p>
            {/* <Image
                src={props.imageSrc}
                alt="Post image"
                width={400}
                height={300}
            /> */}
            <div className={styles.image}>
                <img
                    src={props.imageSrc}
                    alt="Post image"
                />
            </div>
        </a>
    )
}

export default PostCard
