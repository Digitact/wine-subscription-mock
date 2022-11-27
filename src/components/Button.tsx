import clsx from 'clsx';
import { ReactNode, SyntheticEvent } from 'react';
import SpinnerIcon from './Icons/SpinnerIcon';

interface ButtonProp {
    children: ReactNode;
    id?: string;
    onClick?: (e: SyntheticEvent) => void;
    disabled?: boolean;
    isLoading?: boolean;
    type?: 'submit' | 'button';
    className?: string;
    buttonColor?: string;
}

export function Button({
    onClick,
    type = 'button',
    buttonColor = 'primary',
    disabled = false,
    isLoading = false,
    className = '',
    children,
    id,
    ...props
}: ButtonProp) {
    const classType = () => {
        if (buttonColor === 'primary') {
            return 'text-white bg-primary disabled:bg-gray-500 focus:ring-primary hover:bg-black';
        }
        if (buttonColor === 'secondary') {
            return 'bg-gray-200 text-gray-600 hover:bg-gray-300 focus:ring-offset-gray-50 focus:ring-primary';
        }
    };

    return (
        <button
            id={id}
            disabled={disabled}
            type={type}
            onClick={onClick}
            className={clsx(
                'flex items-center justify-center w-full px-8 py-3 text-base font-medium transition-colors border border-transparent first:focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50',
                disabled && !isLoading ? 'disabled:bg-gray-300 disabled:text-gray-700 disabled:shadow-inner' : '',
                classType(),
                className,
            )}
            {...props}
        >
            {isLoading ? <SpinnerIcon className="w-5 h-6" /> : children}
        </button>
    );
}
