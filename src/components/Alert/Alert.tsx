import React, { useState, useEffect } from 'react';
import "./style.scss";
import Image from "next/image";

type AlertProps = {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
};

export default function Alert({ message, type, onClose }: AlertProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    visible && (
      <div id="alert-toast" className={`alert ${type}`} data-testid="alert-toast">
        <span>{message}</span>
        <button className="close-button" onClick={onClose}>
          <Image className="close-icon" src={'/assets/close.svg'} alt="logo" width={10} height={10} />
        </button>
      </div>
    )
  );
};
