import React, { useState } from "react";
import Modal from "../Modal";
import { Cell, Row, Table } from "../Table";
import Button from "../Button";

const SYMBOLS = [
  {symbol: "{T}", description: "tap this permanent"},
  {symbol: "{W}", description: "one white mana"},
  {symbol: "{U}", description: "one blue mana"},
  {symbol: "{B}", description: "one black mana"},
  {symbol: "{R}", description: "one red mana"},
  {symbol: "{G}", description: "one green mana"},
  {symbol: "{C}", description: "one colorless mana"},
  {symbol: "{Q}", description: "untap this permanent"},
  {symbol: "{X}", description: "X generic mana"},
  {symbol: "{0}", description: "zero mana"},
  {symbol: "{1}", description: "1 generic mana"},
  {symbol: "{N}", description: "(Replace N with any number) N generic mana"},
];

const RulesTextInput = ({ hashParams, onUpdate }) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <h2>Rules Text</h2>
      <input
        type="text"
        placeholder="Any text, e.g. deathtouch..."
        value={hashParams.oracle_text?.[0] || ''}
        onChange={(e) => onUpdate({ oracle_text: [e.target.value] })}
      />
      <div className="rules-text__reminder">
        Add any text you would expect to see in the rules text. You can also search for particular symbols.
        A list of those possible symbols can be found <Button type="button" className="button--no-button" onClick={() => setModalOpen(true)}>here</Button>.
      </div>
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <h1>Rules Text Symbols</h1>
          <Table>
            <Row isHeading>
              <Cell className="rules-text__symbols-table--symbol">
                Symbol
              </Cell>
              <Cell className="rules-text__symbols-table--description">
                Meaning
              </Cell>
            </Row>
            {SYMBOLS.map(({ symbol, description }) => (
              <Row>
                <Cell className="rules-text__symbols-table--symbol">
                  {symbol}
                </Cell>
                <Cell className="rules-text__symbols-table--description">
                  {description}
                </Cell>
              </Row>
            ))}
          </Table>
        </Modal>
      )}
    </>
  )
};

export default RulesTextInput;