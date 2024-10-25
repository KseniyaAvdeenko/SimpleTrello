import React, {ChangeEvent, FC} from 'react';
import styles from "../../assets/styles/Profile.module.sass";

interface IOptionChoosingProps{
    optionsArray: Array<{id: string; value:string}>;
    value: string;
    onChange: Function;
    inputName: string;
}
const OptionChoosing: FC<IOptionChoosingProps> = ({inputName, onChange, optionsArray, value}) => {
    return (
        <div className={styles.inputContainer__colors}>
                        {optionsArray.map(color => (
                            <label className={styles.colors__label} htmlFor={color.id} key={color.id}
                                   style={{
                                       backgroundColor: color.value,
                                       outline: color.value === value ? '.2rem solid #8FBC8F' : 'none'
                                   }}>
                                <input
                                    type="radio"
                                    name={inputName}
                                    id={color.id}
                                    checked={color.value === value}
                                    value={color.value}
                                    onChange={e => onChange(e)}
                                />
                            </label>
                        ))}
                    </div>
    );
};

export default OptionChoosing;
