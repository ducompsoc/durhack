import type React from "react"

const styles: Record<string, React.CSSProperties> = {
  error: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  desc: {
    display: "flex",
    height: "96px",
    flexDirection: "row",
    alignItems: "center",
  },
  h1: {
    display: "inline-block",
    margin: "0 20px 0 0",
    paddingRight: 23,
    fontSize: 48,
    fontWeight: 500,
    verticalAlign: "top",
    borderRight: "1px solid hsl(var(--foreground) / 0.5)",
  },
  h2: {
    fontSize: 28,
    fontWeight: 400,
    lineHeight: "28px",
  },
  wrap: {
    display: "inline-block",
  },
}

export type HttpErrorProps = {
  statusCode?: string
  message: string
} & React.HTMLAttributes<HTMLDivElement>

export function ServerErrorPage({ style, ...props }: HttpErrorProps) {
  style ??= {}
  style.minHeight = "100vh"
  return <ServerError style={style} {...props} />
}

export function ServerError({ statusCode, message, style, ...props }: HttpErrorProps) {
  return (
    <main style={{ ...styles.error, ...style }} {...props}>
      <div style={styles.desc}>
        {statusCode ? <h1 style={styles.h1}>{statusCode}</h1> : null}
        <div style={styles.wrap}>
          <h2 style={styles.h2}>{message}.</h2>
        </div>
      </div>
    </main>
  )
}
