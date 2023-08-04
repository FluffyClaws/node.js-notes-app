import { Schema, ValidationError } from "yup";
import { Request, Response, NextFunction } from "express";

const validateSchema = (schema: Schema<any>, data: any) => {
  try {
    schema.validateSync(data, { abortEarly: false });
  } catch (error) {
    const validationError = error as ValidationError;
    const errors = validationError.inner.map((err) => ({
      field: err.path,
      message: err.message,
    }));
    throw new Error(JSON.stringify(errors));
  }
};

const validateSchemaMiddleware = (schema: Schema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      validateSchema(schema, req.body);
      next();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      res.status(400).json({ errors: JSON.parse(errorMessage) });
    }
  };
};

export default validateSchemaMiddleware;
