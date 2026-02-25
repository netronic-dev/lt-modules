import { Fragment } from "react";

export const renderTextWithLinks = (text: string, links: Record<string, React.ReactNode>) => {
  return text.split(/(\{link\d+\})/g).map((part, index) => {
    const match = part.match(/\{(link\d+)\}/);
    if (match && links[match[1]]) {
      return <Fragment key={index} >{links[match[1]]}</Fragment>;
    }
    return <Fragment key={index}>{part}</Fragment>;
  });
};
