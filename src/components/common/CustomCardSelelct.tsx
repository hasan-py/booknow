import { Fragment, useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import CustomInputLabel from "./CustomInputLabel";

/*
 * Type declaration for range
 */
type CreateArrayWithLengthX<
  LENGTH extends number,
  ACC extends unknown[] = []
> = ACC["length"] extends LENGTH
  ? ACC
  : CreateArrayWithLengthX<LENGTH, [...ACC, 1]>;

type NumericRange<
  START_ARR extends number[],
  END extends number,
  ACC extends number = never
> = START_ARR["length"] extends END
  ? ACC | END
  : NumericRange<[...START_ARR, 1], END, ACC | START_ARR["length"]>;

type gridRange = NumericRange<CreateArrayWithLengthX<1>, 12>;

export interface TOptionType {
  value: string;
  label: string;
  isActive?: boolean;
}

export default function CustomCardSelect({
  formSetup,
  options,
  grid,
  multiSelect,
  name,
  label,
}: {
  label?: string;
  formSetup: UseFormReturn<any>;
  options: TOptionType[];
  grid: gridRange;
  multiSelect?: boolean;
  name: string;
}) {
  const { setValue, getValues, register } = formSetup;
  const [_options, setOptions] = useState<TOptionType[]>(options || []);

  useEffect(() => {
    const defaultValue = getValues(name) || {};

    let defaultValuesObject: { [key: string]: any } = {};

    if (Array.isArray(defaultValue)) {
      defaultValue.forEach((elem: any) => {
        defaultValuesObject[`${elem.value}`] = elem;
      });
    } else {
      defaultValuesObject[`${defaultValue.value}`] = defaultValue;
    }

    const mappedOptions = _options?.map((item: TOptionType) => {
      if (defaultValuesObject[`${item?.value}`]) {
        return {
          ...item,
          isActive: true,
        };
      }
      return item;
    });

    setOptions(mappedOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  const selectHandler = (index: number) => {
    const copyOptions = _options.map((item) => {
      return {
        ...item,
        isActive: multiSelect ? item.isActive : false,
      };
    });

    if (multiSelect) {
      copyOptions[index].isActive = !copyOptions[index].isActive;
      setOptions(copyOptions); // set Local state
      setValue(
        name,
        copyOptions
          ?.filter((item) => item?.isActive === true)
          ?.map((item) => {
            const payload = { ...item };
            delete payload.isActive;
            return payload;
          })
      ); // Remove is Active
    } else {
      copyOptions[index].isActive = !copyOptions[index].isActive;
      setOptions(copyOptions);

      const valueObject = {
        ...copyOptions[index],
      } as Partial<TOptionType>;

      delete valueObject?.isActive; // delete is Active true and set to it react hook form
      setValue(name, valueObject);
    }
  };

  return (
    <>
      {label ? <CustomInputLabel label={label} name={name} /> : null}

      <div
        {...register(name)}
        className={`grid ${`grid-cols-${grid}` || "grid-cols-2"} gap-x-2`}
      >
        {_options?.map((item: TOptionType, index: number) => (
          <Fragment key={index}>
            {item?.isActive ? (
              <div
                onClick={() => selectHandler(index)}
                className="flex items-center space-x-2 justify-center text-center col-span-1 py-1 md:px-4 md:py-2 cursor-pointer font-semibold uppercase text-sm rounded shadow hover:shadow-lg ease-linear transition-all duration-150 text-stone-600 border border-orange-500 text-orange-500"
              >
                <div className="h-4 w-4 rounded-full bg-orange-500 relative">
                  <div className="h-2 w-2 rounded-full absolute bg-white m-1"></div>
                </div>
                <div>{item?.label}</div>
              </div>
            ) : (
              <div
                onClick={() => selectHandler(index)}
                className="flex items-center space-x-2 justify-center text-center col-span-1 py-1 md:px-4 md:py-2 cursor-pointer font-semibold uppercase text-sm rounded shadow hover:shadow-lg ease-linear transition-all duration-150 text-stone-600  border border-stone-300"
              >
                <div className="h-4 w-4 rounded-full bg-gray-400 relative">
                  <div className="h-2 w-2 rounded-full absolute bg-white m-1"></div>
                </div>
                <div>{item?.label}</div>
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </>
  );
}
