import React,{memo} from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white bg-opacity-75">
      <div className="w-16 h-16 border-4 border-[#031035d4] border-solid border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default memo(Loader);
