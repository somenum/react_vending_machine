import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./Form.module.scss";
import Button from "../Button";
import PropTypes from "prop-types";
import { DataForm } from "../../types";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).max(15).required(),
});

const propTypes = {
  title: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

type Props = PropTypes.InferProps<typeof propTypes>;

const Form: FC<Props> = ({ title, handleClick }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataForm>({
    resolver: yupResolver(schema),
  });

  const submitForm = (data: DataForm) => {
    handleClick(data.email, data.password);
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className={styles["form"]}>
      <h1 className={styles["form-title"]}>{title}</h1>
      <input
        type="email"
        placeholder="email"
        {...register("email")}
        className={errors.email && styles["form-inputError"]}
      />
      <span className={styles["form-error"]}>{errors.email?.message}</span>
      <input
        type="password"
        placeholder="password"
        {...register("password")}
        className={errors.password && styles["form-inputError"]}
      />
      <span className={styles["form-error"]}>{errors.password?.message}</span>
      <Button submit className={styles["form-button"]} buttonStyle="primary">
        Submit
      </Button>
    </form>
  );
};

export default Form;
