interface InputBoxProps{
    value?: string;
    label: string;
    placeholder?: string;
    type?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export function InputBox({value, label, placeholder,type, onChange}: InputBoxProps){
    return (
        <div>
            <div className="text-sm font-medium text-left py-2">
                {label}
            </div>
            <div>
                <input 
                onChange={onChange} 
                type = {type}
                value = {value}
                placeholder={placeholder} 
                className="w-full px-2 py-1 border rounded  border-slate-200" />
            </div>
        </div>
    )
}