import React from "react";

export enum DefaultValidatorKeys {
  Required = "REQUIRED",
}

export enum DefaultFormatterKeys {
  Text = "TEXT",
  Date = "DATE",
}

export type DefaultFieldValues =
  | boolean
  | Date
  | number
  | string
  | undefined
  | null;

export type ValidatorMap<K extends string, V extends DefaultFieldValues> = {
  [P in K]: <E extends Entity<V>>(
    v: V,
    fieldControls: FieldControlMap<E>
  ) => string | true;
};

export type FormatterMap<F extends string, V extends DefaultFieldValues> = {
  [K in F]: {
    mask: (v: V) => string;
    unmask: (d: string) => V;
  };
};

export type FactoryConfig<
  K extends string,
  V extends DefaultFieldValues,
  F extends string
> = {
  validatorMap: ValidatorMap<K, V>;
  formatterMap: FormatterMap<F, V>;
};

export type Entity<V extends DefaultFieldValues> = Record<string, V>;
export type NullableFields<E, V extends DefaultFieldValues> = Entity<V> &
  {
    [K in keyof E]: E[K] | null;
  };

export type FieldConfigMap<E, T, V> = {
  [K in keyof E]: {
    type: keyof T;
    validators: (keyof V)[];
  };
};

export type FieldControlMap<E> = {
  [K in keyof E]: {
    isPristine: boolean;
    errors: string[];
    rawValue: E[K];
    displayValue: string;
  };
};

export type FormHookAPI<E> = {
  isPristine: boolean;
  isValid: boolean;
  fieldControls: FieldControlMap<E>;
  setFieldControls: React.Dispatch<React.SetStateAction<FieldControlMap<E>>>;
  updateField: (key: keyof E, value: string) => void;
  entity: E;
};

export const defaultValidatorMap: ValidatorMap<
  DefaultValidatorKeys,
  DefaultFieldValues
> = {
  [DefaultValidatorKeys.Required]: (v) => {
    const errMsg = "This field is required";
    return v == null
      ? errMsg
      : typeof v === "string"
      ? v === ""
        ? errMsg
        : true
      : true /** add more type checks here */;
  },
};

export const defaultFormatterMap: FormatterMap<
  DefaultFormatterKeys,
  DefaultFieldValues
> = {
  [DefaultFormatterKeys.Text]: {
    mask: (v) => (v == null ? "" : String(v)),
    unmask: (s) => s || null,
  },
  [DefaultFormatterKeys.Date]: {
    mask: (v: DefaultFieldValues): string => {
      if (v == null) return "";
      if (!(v instanceof Date))
        throw Error(
          `Invalid field value '${v}. Must be Date instance or null'`
        );
      const timeZoneOffset = v.getTimezoneOffset() * 60 * 1000;
      const iso = new Date(v.getTime() - timeZoneOffset).toISOString();
      return iso.slice(0, iso.indexOf("T"));
    },
    unmask: (s: string): Date | null => {
      if (s === "") return null;
      const date = new Date(s);
      return new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
    },
  },
};

export const useFormFactory = <
  K extends string,
  V extends DefaultFieldValues,
  F extends string
>(
  factoryConfig: FactoryConfig<K, V, F>
) => {
  return <E extends Entity<V>>(
    fieldConfigMap: FieldConfigMap<E, FormatterMap<F, V>, ValidatorMap<K, V>>,
    entity: E
  ): FormHookAPI<E> => {
    const generateDisplayValue = (formatter: F, newValue: V): string => {
      return factoryConfig.formatterMap[formatter].mask(newValue);
    };

    const generateFieldErrors = (
      validators: K[],
      newValue: V,
      currentFieldControls = fieldControls
    ): string[] => {
      return validators.reduce<string[]>((e, k) => {
        const result = factoryConfig.validatorMap[k](
          newValue,
          currentFieldControls
        );
        return typeof result === "string" ? [...e, result] : e;
      }, []);
    };

    const generateEntityFromFieldControlMap = (
      fieldControlMap: FieldControlMap<E>
    ): E => {
      const output = entity;

      for (const key in fieldConfigMap) {
        output[key] = fieldControlMap[key].rawValue;
      }

      return { ...entity, ...output };
    };

    const generateInitialFieldControls = () => {
      const output = {} as FieldControlMap<E>;

      for (const k in fieldConfigMap) {
        const fieldConfig = fieldConfigMap[k];
        const rawValue = entity[k];
        const displayValue = generateDisplayValue(fieldConfig.type, rawValue);

        output[k] = {
          isPristine: true,
          rawValue,
          displayValue,
          errors: [],
        };
      }

      for (const k in fieldConfigMap) {
        const fieldConfig = fieldConfigMap[k];
        const rawValue = entity[k];
        output[k].errors = generateFieldErrors(
          fieldConfig.validators,
          rawValue,
          output
        );
      }

      return output;
    };

    const [fieldControls, setFieldControls] = React.useState(
      generateInitialFieldControls()
    );

    const validateForm = (): boolean => {
      for (const k in fieldControls) {
        if (fieldControls[k].errors.length) return false;
      }
      return true;
    };

    const updateField = (fieldKey: keyof E, value: string): void => {
      const rawValue = factoryConfig.formatterMap[
        fieldConfigMap[fieldKey].type
      ].unmask(value);
      const output = {
        ...fieldControls,
        [fieldKey]: {
          isPristine: false,
          rawValue,
          errors: [],
          displayValue: generateDisplayValue(
            fieldConfigMap[fieldKey].type,
            rawValue
          ),
        },
      } as FieldControlMap<E>;

      for (const k in fieldControls) {
        output[k].errors = generateFieldErrors(
          fieldConfigMap[k].validators,
          output[k].rawValue,
          output
        );
      }

      setFieldControls(output);
    };

    const getFormPristineStatus = () => {
      for (const key in fieldControls) {
        if (!fieldControls[key].isPristine) return false;
      }
      return true;
    };

    return {
      isPristine: getFormPristineStatus(),
      isValid: validateForm(),
      fieldControls,
      setFieldControls,
      updateField,
      entity: generateEntityFromFieldControlMap(fieldControls),
    };
  };
};
