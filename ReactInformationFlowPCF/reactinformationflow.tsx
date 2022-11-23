import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { forwardRef, useImperativeHandle, useRef } from "react";

interface InputProps{
}

type RefHandler = {
}

const MainComponent = () => {

    const nameRef =  useRef() as React.MutableRefObject<HTMLInputElement>;

    const focusHandler = () => {
        nameRef.current.focus()
    }
    const blurHandler = () => {
        nameRef.current.blur()
    }
    const toggleHandler = () => {
        nameRef.current.toggleAttribute("Some Value")
    }
    const clearHandler = () => {
        nameRef.current.remove()
    }

    return(
        <>
            <SubComponent ref={nameRef}/>
            <div>
                <button onClick={focusHandler}>Focus</button>
                <button onClick={blurHandler}>Blur</button>
                <button onClick={toggleHandler}>Toggle</button>
                <button onClick={clearHandler}>Clear</button>
            </div>
        </>
    )
}

const SubComponent = forwardRef<RefHandler,InputProps>((props, ref) => {

    const nameRef = useRef() as React.MutableRefObject<HTMLInputElement>;

    useImperativeHandle(ref, () => ({
        focus: () => {
            nameRef?.current?.focus();
        },
        blur: () => {
            alert("Some blur function")
        },
        toggleAttribute: (val: string) => {
            nameRef.current.value = val
        },
        remove: () => {
            nameRef.current.value = ""
        }
      }));

    return(
        <input type="text" name="name" value="" ref={nameRef}/>
    )
})

SubComponent.displayName = 'Input';


export function Render(context:any, container:any) {
  
    /* ReactDOM.render is deprecated, but FluentUI does not support new React version until now
    const root = createRoot(container);
    root.render(<div><SearchSelectControl context={context} theobj={theobj} /></div>);
    */
   
    ReactDOM.render(
      <>
        <MainComponent />
      </>
      , container
    );
  
  }



