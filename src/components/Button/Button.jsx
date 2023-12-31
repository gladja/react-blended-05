import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './Button.module.css';
import {useUpdateCommentsMutation} from "../../redux/commentApi";
import toast from 'react-hot-toast';

export const Button = ({ children, counter, role = 'thumbsUp', id }) => {
  const variants = {
    [styles.thumbsUp]: role === 'thumbsUp',
    [styles.thumbsDown]: role === 'thumbsDown',
  };
  const [updateComment, {isLoading}] = useUpdateCommentsMutation();

  const onBtnHandleClick = async () => {
    try {
      await updateComment({id, [role]: counter + 1})
    } catch (error) {
      toast.error("Unexpected error");
    }
  };

  return (
    <button
      className={classNames(styles.button, variants)}
      type='button'
      counter={counter}
      onClick={onBtnHandleClick}
      id={id}
    >
      {children}

      <span className={styles.counter}>
        <span className={classNames({[styles.ping]: isLoading})}></span>
        {counter}
      </span>
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  counter: PropTypes.number.isRequired,
  role: PropTypes.string,
  id: PropTypes.string.isRequired,
};
