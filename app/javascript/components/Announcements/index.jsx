import React from 'react';
import { toHTML } from 'discord-markdown';

const Announcements = ({ messages }) => (
    <>
      <h1>Recent Announcements</h1>
      {messages.map(({ heading, sub_heading: subHeading, author, age, link, id }) => (
        <div className="announcement" key={id}>
          <div
            // eslint-disable-next-line react/no-danger
            className="announcement__heading"
            dangerouslySetInnerHTML={{
              __html: `${toHTML(heading)}`
            }}
          />
          <div className="announcement__details">
            <div className="announcement__details--author">Sent by {author.name}</div>
            <div className="announcement__details--age">{age} ago</div>
          </div>
          <div
            // eslint-disable-next-line react/no-danger
            className="announcement__subheading"
            dangerouslySetInnerHTML={{
              __html: `${toHTML(subHeading)}...`
            }}
          />
          <div className="announcement__link">
            <a href={link}>Full Message ➡</a>
          </div>
        </div>
      ))}
    </>
  )

export default Announcements;