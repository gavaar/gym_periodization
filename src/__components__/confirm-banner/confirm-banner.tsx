import './confirm-banner.css';
import { checkMark, failMark } from "home/config";
import { render, unmountComponentAtNode } from "react-dom";
import addClickOutsideBehavior from '__components__/__helpers/click-outside-behavior';

interface ConfirmBannerProps {
    message: string;
    onSelect: (selection: boolean) => any;
}
function ConfirmBanner({ message, onSelect }: ConfirmBannerProps) {
    return (
        <>
            <span className="ConfirmBanner__message">{message}</span>
            <button className="ConfirmBanner__btn confirm" onClick={() => onSelect(true)}>{checkMark}</button>
            <button className="ConfirmBanner__btn cancel" onClick={() => onSelect(false)}>{failMark}</button>
        </>
    )
}

export default function ConfirmWithBanner(message: string): Promise<boolean> {
    if (document.getElementById(`confirm-banner-${message}`)) {
        return new Promise(() => {});
    }

    function createBannerElement(elementType: string = 'div'): HTMLElement {
        const element = document.createElement(elementType);
        element.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        element.setAttribute('id', `confirm-banner-${message}`);
        element.setAttribute('class', 'ConfirmBanner');
        return element;
    }

    function appendBannerToRoot(banner: HTMLElement, outOfElementClickCallback: (any?: any) => any) {
        document.getElementById('root')!.appendChild(banner);
        addClickOutsideBehavior(outOfElementClickCallback);
    }

    function createSelectionHandler(element: HTMLElement, resolveFunction: (val: any) => void) {
        return function(selection: boolean) {
            unmountComponentAtNode(element);
            element.remove();
            resolveFunction(selection);
        }
    }

    return new Promise((resolve) => {
        const banner = createBannerElement();
        const onSelectionMade = createSelectionHandler(banner, resolve);
        
        appendBannerToRoot(banner, () => onSelectionMade(false));

        render(<ConfirmBanner message={message} onSelect={onSelectionMade} />, banner);
    });
}
