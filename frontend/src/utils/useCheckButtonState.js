import { useState ,useEffect } from "react";

function useCheckButtonState(form, isValid) {
  const [submitState, setSubmitState] = useState(false)

  useEffect(() => {
    if(form) { 
      if(form.checkValidity()) {
      setSubmitState(true);
      } else setSubmitState(false);
    }
  },[form, isValid, submitState]);
  
  return submitState;
}

export default useCheckButtonState;