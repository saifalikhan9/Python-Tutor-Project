import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
// import "highlight.js/styles/github-dark.css"; // or any other style you like

const ModuleContent = ({ content }) => {
  return (
    <div className="module-content text-gray-700">
      <h2>{content.title}</h2>
      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
        {content.text}
      </ReactMarkdown>
    </div>
  );
};

export default ModuleContent;
