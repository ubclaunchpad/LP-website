// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
"use client";
import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import { Button } from "@/components/primitives/button";
import { updateForm } from "@/app/portal/admin/actions";

export default function CodeTextArea({
  formId,
  initialValue,
}: {
  initialValue: string;
  formId: number;
}) {
  const [code] = useState(JSON.stringify(JSON.parse(initialValue), null, 2));

  const [value, setValue] = React.useState(code);
  const onChange = React.useCallback((val) => {
    setValue(val);
  }, []);

  return (
    <div className="flex flex-col gap-4 flex-1 w-full px-4 ">
      <div className="flex gap-4 w-full justify-end">
        <Button
          variant={"secondary"}
          size={"fit"}
          onClick={() => {
            updateForm(formId, { questions: JSON.parse(value) });
          }}
        >
          Save
        </Button>
      </div>
      <div className={"flex flex-col flex-1  w-full gap-2  py-0"}>
        <div className="flex  gap-2 flex-1   ">
          <CodeMirror
            theme={tokyoNight}
            value={value}
            className={"overflow-y-scroll flex-1 rounded"}
            extensions={[javascript({ jsx: true })]}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}
