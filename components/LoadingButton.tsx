type LoadingButtonProps = {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
};

function LoadingButton({
  text = 'Loading...',
  size = 'md',
}: LoadingButtonProps) {
  const sizeMap = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <div
        className={`${sizeMap[size]} animate-spin rounded-full border-3 border-white border-t-transparent`}
      ></div>
      {text && <span className="text-white">{text}</span>}
    </div>
  );
}

export default LoadingButton;
