
"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

const nav = [
  { href: "#work", label: "Work" },
  { href: "#stack", label: "Stack" },
  { href: "#experience", label: "Experience" },
  { href: "#recognition", label: "Recognition" },
  { href: "#contact", label: "Contact" },
];

const email = "rishiroy12305@gmail.com";

type Command = {
  id: string;
  label: string;
  hint: string;
  run: () => void;
};

const Navbar = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();

  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  const open = useCallback(() => {
    setQuery("");
    setActive(0);
    dialogRef.current?.showModal();
    inputRef.current?.focus();
  }, []);

  const go = (hash: string) => () => {
    document.querySelector(hash)?.scrollIntoView({
      behavior: "smooth",
    });
    history.replaceState(null, "", hash);
  };

  const commands: Command[] = [
    ...nav.map((item) => ({
      id: item.href,
      label: `Go to ${item.label}`,
      hint: "Section",
      run: go(item.href),
    })),
    {
      id: "copy",
      label: "Copy email address",
      hint: email,
      run: () => {
        navigator.clipboard?.writeText(email).catch(() => {});
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      },
    },
    {
      id: "github",
      label: "Open GitHub",
      hint: "External",
      run: () =>
        window.open("https://github.com/Rishi63121", "_blank", "noopener"),
    },
    {
      id: "linkedin",
      label: "Open LinkedIn",
      hint: "External",
      run: () =>
        window.open(
          "https://www.linkedin.com/in/rishi-roy-4209a6273",
          "_blank",
          "noopener"
        ),
    },
    {
      id: "leetcode",
      label: "Open LeetCode",
      hint: "External",
      run: () =>
        window.open("https://leetcode.com/u/Yb3TN9TGz9/", "_blank", "noopener"),
    },
  ];

  const filtered = commands.filter((command) =>
    command.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();

        if (dialogRef.current?.open) {
          close();
        } else {
          open();
        }
      }
    };

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  const onInputKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((current) => Math.min(current + 1, filtered.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((current) => Math.max(current - 1, 0));
    } else if (event.key === "Enter" && filtered[active]) {
      event.preventDefault();
      filtered[active].run();

      if (filtered[active].id !== "copy") close();
    }
  };

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <div className="glass flex w-full max-w-3xl items-center justify-between gap-2 rounded-full py-2 pl-4 pr-2 shadow-2xl">

        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 font-mono text-sm font-medium tracking-tight"
        >
          <span className="grid size-7 place-items-center rounded-full bg-accent text-accent-ink">
            R
          </span>
          <span className="hidden sm:inline">rishi.roy</span>
        </a>

        {/* Navigation links */}
        <nav aria-label="Primary" className="hidden items-center md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:bg-text/10 hover:text-text"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Command palette button */}
        <button
          type="button"
          onClick={open}
          aria-haspopup="dialog"
          className="flex items-center gap-2 rounded-full bg-text px-4 py-2 text-sm font-medium text-bg transition-transform hover:scale-[1.03]"
        >
          Command
          <kbd className="rounded bg-bg/10 px-1.5 font-mono text-[11px]">
            Ctrl K
          </kbd>
        </button>
      </div>

      {/* Command palette */}
      <dialog
        ref={dialogRef}
        aria-label="Command palette"
        onClick={(event) => {
          if (event.target === dialogRef.current) close();
        }}
        className="m-auto mt-[12vh] w-[min(92vw,560px)] overflow-hidden rounded-2xl border border-line-strong bg-[#140a0a] p-0 text-text shadow-2xl"
      >
        <input
          ref={inputRef}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(0);
          }}
          onKeyDown={onInputKey}
          role="combobox"
          aria-expanded="true"
          aria-controls={listId}
          placeholder="Type a command or search..."
          className="w-full border-b border-line bg-transparent px-5 py-4 text-base outline-none placeholder:text-faint"
        />

        <ul id={listId} role="listbox" className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 && (
            <li className="px-3 py-6 text-center text-sm text-faint">
              No matching command
            </li>
          )}

          {filtered.map((command, index) => (
            <li
              key={command.id}
              role="option"
              aria-selected={index === active}
              onMouseEnter={() => setActive(index)}
              onClick={() => {
                command.run();
                if (command.id !== "copy") close();
              }}
              className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm ${
                index === active
                  ? "bg-text/10 text-text"
                  : "text-muted"
              }`}
            >
              <span>
                {command.id === "copy" && copied
                  ? "Copied to clipboard"
                  : command.label}
              </span>
              <span className="font-mono text-xs text-faint">
                {command.hint}
              </span>
            </li>
          ))}
        </ul>
      </dialog>
    </header>
  );
};

export default Navbar;
