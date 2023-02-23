import { useEffect, useState } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { usePopper } from 'react-popper';
import styled from 'styled-components';

import Content from './Content';

export default function MoreInfo({ title, more }) {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
    placement: 'top',
  });

  const [open, setOpen] = useState(false);
  const [mouse, setMouse] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  useEffect(() => {
    if (mouse) {
      const timeout = setTimeout(() => {
        setOpen(true);
      }, 1000);
      setTimeoutId(timeout);
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      setTimeoutId(null);
    }
  }, [mouse]);

  return (
    <>
      <TooltipButton
        type="button"
        className="more"
        style={{ cursor: 'pointer' }}
        ref={setReferenceElement}
        onMouseEnter={() => setMouse(true)}
        onMouseLeave={() => {
          setMouse(false);
          setOpen(false);
        }}
      >
        <AiOutlineInfoCircle />
      </TooltipButton>
      {open && (
        <Tooltip ref={setPopperElement} style={styles.popper} {...attributes.popper}>
          <Content>{more}</Content>
          <div id="arrow" ref={setArrowElement} style={styles.arrow}></div>
        </Tooltip>
      )}
    </>
  );
}
const TooltipButton = styled.button`
  border: 0;
  background: transparent;
  svg {
    width: 20px;
    height: 20px;
  }
`;
const Tooltip = styled.div`
  background: ${({ theme }) => theme.dark};
  color: ${({ theme }) => theme.light};
  font-weight: bold;
  padding: 4px 8px;
  font-size: 13px;
  border-radius: 4px;
  max-width: 300px;
  #arrow,
  #arrow::before {
    position: absolute;
    width: 8px;
    height: 8px;
    background: inherit;
  }

  #arrow {
    visibility: hidden;
  }

  #arrow::before {
    visibility: visible;
    content: '';
    transform: rotate(45deg);
  }
`;
