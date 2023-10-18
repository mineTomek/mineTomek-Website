import { FC } from 'react'

type Props = {
  width: number
  height: number
}

const Logo: FC<Props> = props => {
  return (
    <svg
      className='invert'
      width={props.width}
      height={props.height}
      viewBox='0 0 512 512'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M174 221C162.954 221 154 229.954 154 241V429C154 440.046 162.954 449 174 449H338C349.046 449 358 440.046 358 429V241C358 229.954 349.046 221 338 221H174ZM190 241C178.954 241 170 249.954 170 261V268.5C170 279.546 178.954 288.5 190 288.5H208.842C219.888 288.5 228.842 297.454 228.842 308.5V414C228.842 425.046 237.796 434 248.842 434H256H263.158C274.204 434 283.158 425.046 283.158 414V308.5C283.158 297.454 292.112 288.5 303.158 288.5H322C333.046 288.5 342 279.546 342 268.5V261C342 249.954 333.046 241 322 241H256H190Z'
        fill='white'
      />
      <path
        d='M127.322 57.4754C132.627 57.4754 137.714 59.5825 141.464 63.3333L256 177.869V202.656H155.607C144.561 202.656 135.607 211.61 135.607 222.656V430.525C135.607 441.57 126.652 450.525 115.607 450.525H60C48.9543 450.525 40 441.57 40 430.525V77.4754C40 66.4297 48.9543 57.4754 60 57.4754H127.322Z'
        fill='white'
      />
      <path
        d='M384.678 57.4754C379.373 57.4754 374.286 59.5825 370.536 63.3333L256 177.869V202.656H356.393C367.439 202.656 376.393 211.61 376.393 222.656V430.525C376.393 441.57 385.348 450.525 396.393 450.525H452C463.046 450.525 472 441.57 472 430.525V77.4754C472 66.4297 463.046 57.4754 452 57.4754H384.678Z'
        fill='white'
      />
    </svg>
  )
}

export default Logo