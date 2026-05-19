import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function WidgetIcon(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...props}>
      <path d="M0 0h16v16H0z" fill="none" />
      <g fill="none">
        <g clipPath="url(#SVGRVeuBdhT)">
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M11 4a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5zm-2 8.5a.5.5 0 0 0 .5-.5V7a.5.5 0 0 0-.5-.5H7a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5zm-4.5 0A.5.5 0 0 0 5 12v-2a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5zM2 7.5V4a.5.5 0 0 1 .5-.5h2A.5.5 0 0 1 5 4v3.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5m5-4h2a.5.5 0 0 1 .5.5v.5A.5.5 0 0 1 9 5H7a.5.5 0 0 1-.5-.5V4a.5.5 0 0 1 .5-.5M7 2H2.5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"
            clipRule="evenodd"
          />
        </g>
        <defs>
          <clipPath id="SVGRVeuBdhT">
            <path fill="currentColor" d="M0 0h16v16H0z" />
          </clipPath>
        </defs>
      </g>
    </svg>
  );
}

function PieChartIcon(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...props}>
      <path d="M0 0h16v16H0z" fill="none" />
      <g fill="none">
        <g clipPath="url(#SVGRVeuBdhT)">
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M10.257 4.2a.86.86 0 0 1-.86.274l-3.103-.776a2.81 2.81 0 0 0-2.796.876L1.242 7.152A3 3 0 0 0 .5 9.127V12a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V3.309a1.933 1.933 0 0 0-3.4-1.258l-1.31 1.528zM14 6.48V3.31a.433.433 0 0 0-.762-.282l-1.842 2.15a2.36 2.36 0 0 1-2.362.753L5.93 5.154a1.31 1.31 0 0 0-1.303.408L2.37 8.139a1.5 1.5 0 0 0-.37.988v.685l2.304-1.44a2.59 2.59 0 0 1 2.458-.155l1.923.888a1.58 1.58 0 0 0 1.777-.317l.22-.22l1.575-1.574A1.86 1.86 0 0 1 14 6.479m-12 5.52c0 .277.226.501.5.501h11a.5.5 0 0 0 .5-.5V8.337a.4.4 0 0 0-.683-.283L11.523 9.85a3.08 3.08 0 0 1-3.466.618L6.134 9.58a1.09 1.09 0 0 0-1.035.066L2.353 11.36a.75.75 0 0 0-.353.637"
            clipRule="evenodd"
          />
        </g>
        <defs>
          <clipPath id="SVGRVeuBdhT">
            <path fill="currentColor" d="M0 0h16v16H0z" />
          </clipPath>
        </defs>
      </g>
    </svg>
  );
}

function DocumentIcon(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...props}>
      <path d="M0 0h16v16H0z" fill="none" />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="m8.879 4l-.44-.44l-.767-.767a1 1 0 0 0-.708-.293H6A1.5 1.5 0 0 0 4.5 4v5A1.5 1.5 0 0 0 6 10.5h7A1.5 1.5 0 0 0 14.5 9V5.5A1.5 1.5 0 0 0 13 4zM6 1a3 3 0 0 0-3 3a3 3 0 0 0-3 3v5a3 3 0 0 0 3 3h7a3 3 0 0 0 3-3a3 3 0 0 0 3-3V5.5a3 3 0 0 0-3-3H9.5l-.768-.768A2.5 2.5 0 0 0 6.964 1zM1.5 7A1.5 1.5 0 0 1 3 5.5V9a3 3 0 0 0 3 3h5.5a1.5 1.5 0 0 1-1.5 1.5H3A1.5 1.5 0 0 1 1.5 12zm10.75 0a.75.75 0 0 0 0-1.5h-5.5a.75.75 0 0 0 0 1.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function PencilSquareIcon(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...props}>
      <path d="M0 0h16v16H0z" fill="none" />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M6.169 6.331a3 3 0 0 0-.833 1.6l-.338 1.912a1 1 0 0 0 1.159 1.159l1.912-.338a3 3 0 0 0 1.6-.833l3.07-3.07l2-2A.9.9 0 0 0 15 4.13A3.13 3.13 0 0 0 11.87 1a.9.9 0 0 0-.632.262l-2 2zm3.936-1.814L7.229 7.392a1.5 1.5 0 0 0-.416.8L6.6 9.4l1.208-.213l.057-.01a1.5 1.5 0 0 0 .743-.406l2.875-2.876a1.63 1.63 0 0 0-1.378-1.378m2.558.199a3.14 3.14 0 0 0-1.379-1.38l.82-.82a1.63 1.63 0 0 1 1.38 1.38zM8 2.25a.75.75 0 0 0-.75-.75H4.5a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h7a3 3 0 0 0 3-3V8.75a.75.75 0 0 0-1.5 0v2.75a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 11.5v-7A1.5 1.5 0 0 1 4.5 3h2.75A.75.75 0 0 0 8 2.25"
        clipRule="evenodd"
      />
    </svg>
  );
}

export { WidgetIcon, PieChartIcon, DocumentIcon, PencilSquareIcon };
