import styled from 'styled-components'

const Loading = styled.span<{ $size?: string; }>`
  display: inline-flex;
  align-items: center;
  
  & > .spacer {
    margin-right: 2px;
  }
  
  & > span {
    animation-name: blink;
    animation-duration: 1.4s;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
    width: ${props => props.$size === 'small' ? '4px' : '5px'};
    height: ${props => props.$size === 'small' ? '4px' : '5px'};
    border-radius: 50%;
    display: inline-block;
    margin: 0 1px;
  }
  
  & > span:nth-of-type(2) {
    animation-delay: 0.2s;
  }
  
  & > span:nth-of-type(3) {
    animation-delay: 0.4s;
  }

  @keyframes blink {
    0% {
      opacity: 0.2;
    }
    20% {
      opacity: 1;
    }
    100% {
      opacity: 0.2;
    }
  }
`

const LoadingDots = ({
  color = '#000',
  size = 'small',
}: {
  color?: string;
  size?: string;
}) => {

  return (
    // <span className={size == 'small' ? styles.loading2 : styles.loading}>
    <Loading $size={size}>
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
    </Loading>
    // </span>
  );
};
{/* <div style={{width: 120}}>
  <img style={{width: 300, height: 100, position: 'relative', marginLeft: -60}} className="preloader-image" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHN0eWxlPSItLWFuaW1hdGlvbi1zdGF0ZTogcnVubmluZzsiPgogICAgICA8c3R5bGU+CiAgICAgICAgOnJvb3QgewogICAgICAgICAgLS1hbmltYXRpb24tc3RhdGU6IHBhdXNlZDsKICAgICAgICB9CgogICAgICAgIC8qIHVzZXIgcGlja2VkIGEgdGhlbWUgd2hlcmUgdGhlICJyZWd1bGFyIiBzY2hlbWUgaXMgZGFyayAqLwogICAgICAgIC8qIHVzZXIgcGlja2VkIGEgdGhlbWUgYSBsaWdodCBzY2hlbWUgYW5kIGFsc28gZW5hYmxlZCBhIGRhcmsgc2NoZW1lICovCgogICAgICAgIC8qIGRlYWwgd2l0aCBsaWdodCBzY2hlbWUgZmlyc3QgKi8KICAgICAgICBAbWVkaWEgKHByZWZlcnMtY29sb3Itc2NoZW1lOiBsaWdodCkgewogICAgICAgICAgOnJvb3QgewogICAgICAgICAgICAtLXByaW1hcnk6ICMyMDIxMjM7CiAgICAgICAgICAgIC0tc2Vjb25kYXJ5OiAjZmZmZmZmOwogICAgICAgICAgICAtLXRlcnRpYXJ5OiAjMTBhMzdmOwogICAgICAgICAgICAtLXF1YXRlcm5hcnk6ICM3MTVmZGU7CiAgICAgICAgICAgIC0taGlnaGxpZ2h0OiAjNDgyZGE4OwogICAgICAgICAgICAtLXN1Y2Nlc3M6ICMwMDk5MDA7CiAgICAgICAgICB9CiAgICAgICAgfQoKICAgICAgICAvKiB0aGVuIGRlYWwgd2l0aCBkYXJrIHNjaGVtZSAqLwogICAgICAgIEBtZWRpYSAocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspIHsKICAgICAgICAgIDpyb290IHsKICAgICAgICAgICAgLS1wcmltYXJ5OiAjZmZmZmZmOwogICAgICAgICAgICAtLXNlY29uZGFyeTogIzI2MjcyNzsKICAgICAgICAgICAgLS10ZXJ0aWFyeTogIzkzZTY5YzsKICAgICAgICAgICAgLS1xdWF0ZXJuYXJ5OiAjYjliNGVjOwogICAgICAgICAgICAtLWhpZ2hsaWdodDogI2I0OTZmZjsKICAgICAgICAgICAgLS1zdWNjZXNzOiAjMDljZjA5OwogICAgICAgICAgfQogICAgICAgIH0KCiAgICAgICAgLyogdGhlc2Ugc3R5bGVzIG5lZWQgdG8gbGl2ZSBoZXJlIGJlY2F1c2UgdGhlIFNWRyBoYXMgYSBkaWZmZXJlbnQgc2NvcGUgKi8KICAgICAgICAuZG90cyB7CiAgICAgICAgICBhbmltYXRpb24tbmFtZTogbG9hZGVyOwogICAgICAgICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1pbi1vdXQ7CiAgICAgICAgICBhbmltYXRpb24tZHVyYXRpb246IDNzOwogICAgICAgICAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogaW5maW5pdGU7CiAgICAgICAgICBhbmltYXRpb24tcGxheS1zdGF0ZTogdmFyKC0tYW5pbWF0aW9uLXN0YXRlKTsKICAgICAgICAgIHN0cm9rZTogI2ZmZjsKICAgICAgICAgIHN0cm9rZS13aWR0aDogMC41cHg7CiAgICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7CiAgICAgICAgICBvcGFjaXR5OiAwOwogICAgICAgICAgcjogbWF4KDF2dywgMTFweCk7CiAgICAgICAgICBjeTogNTAlOwogICAgICAgICAgZmlsdGVyOiBzYXR1cmF0ZSgyKSBvcGFjaXR5KDAuODUpOwogICAgICAgIH0KCiAgICAgICAgLmRvdHM6Zmlyc3QtY2hpbGQgewogICAgICAgICAgZmlsbDogdmFyKC0tcXVhdGVybmFyeSk7CiAgICAgICAgfQoKICAgICAgICAuZG90czpudGgtY2hpbGQoMikgewogICAgICAgICAgZmlsbDogdmFyKC0tcXVhdGVybmFyeSk7CiAgICAgICAgICBhbmltYXRpb24tZGVsYXk6IDAuMTVzOwogICAgICAgIH0KCiAgICAgICAgLmRvdHM6bnRoLWNoaWxkKDMpIHsKICAgICAgICAgIGZpbGw6IHZhcigtLWhpZ2hsaWdodCk7CiAgICAgICAgICBhbmltYXRpb24tZGVsYXk6IDAuM3M7CiAgICAgICAgfQoKICAgICAgICAuZG90czpudGgtY2hpbGQoNCkgewogICAgICAgICAgZmlsbDogdmFyKC0tdGVydGlhcnkpOwogICAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwLjQ1czsKICAgICAgICB9CgogICAgICAgIC5kb3RzOm50aC1jaGlsZCg1KSB7CiAgICAgICAgICBmaWxsOiB2YXIoLS10ZXJ0aWFyeSk7CiAgICAgICAgICBhbmltYXRpb24tZGVsYXk6IDAuNnM7CiAgICAgICAgfQoKICAgICAgICBAa2V5ZnJhbWVzIGxvYWRlciB7CiAgICAgICAgICAwJSB7CiAgICAgICAgICAgIG9wYWNpdHk6IDA7CiAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7CiAgICAgICAgICB9CiAgICAgICAgICA0NSUgewogICAgICAgICAgICBvcGFjaXR5OiAxOwogICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDAuNyk7CiAgICAgICAgICB9CiAgICAgICAgICA2NSUgewogICAgICAgICAgICBvcGFjaXR5OiAxOwogICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDAuNyk7CiAgICAgICAgICB9CiAgICAgICAgICAxMDAlIHsKICAgICAgICAgICAgb3BhY2l0eTogMDsKICAgICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTsKICAgICAgICAgIH0KICAgICAgICB9CiAgICAgIDwvc3R5bGU+CgogICAgICA8ZyBjbGFzcz0iY29udGFpbmVyIj4KICAgICAgICA8Y2lyY2xlIGNsYXNzPSJkb3RzIiBjeD0iMzB2dyIvPgogICAgICAgIDxjaXJjbGUgY2xhc3M9ImRvdHMiIGN4PSI0MHZ3Ii8+CiAgICAgICAgPGNpcmNsZSBjbGFzcz0iZG90cyIgY3g9IjUwdnciLz4KICAgICAgICA8Y2lyY2xlIGNsYXNzPSJkb3RzIiBjeD0iNjB2dyIvPgogICAgICAgIDxjaXJjbGUgY2xhc3M9ImRvdHMiIGN4PSI3MHZ3Ii8+CiAgICAgIDwvZz4KICAgIDwvc3ZnPg==" alt="Reader Guru" />
</div> */}
export default LoadingDots;

LoadingDots.defaultProps = {
  style: 'small',
};
