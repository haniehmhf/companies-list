import React from "react";
export const Accordion = ({
  id,
  title,
  isopen,
  children,
  handleAccordion,
}: {
  id: number;
  title: string;
  isopen: boolean;
  children: React.ReactNode;
  handleAccordion: (id: number) => void;
}) => {
  return (
    <ul className="accordion">
      <li
        className="accordion-item"
        data-testid="accordion"
        onClick={() => handleAccordion(id)}
      >
        <h2 className="accordion-title">{title}</h2>
        {isopen && children}
      </li>
    </ul>
  );
};
