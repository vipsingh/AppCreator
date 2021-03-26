import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { useEditor } from '@craftjs/core';

export const Viewport: React.FC = ({ children }) => {
    const { enabled, connectors } =  useEditor((state) => ({
        enabled: state.options.enabled,
      }));
    //const [loaded, setLoaded] = useState(false);

    return (
        <div
      className={cx(['viewport'], { loaded: true })}
    >
        <div className="flex-1 h-full">
          <div className="w-full h-full">
            <div
              className={cx([
                'craftjs-renderer h-full w-full transition pb-8',
                {
                  'overflow-auto': enabled,
                  'bg-renderer-gray': enabled,
                },
              ])}
              ref={(ref) => connectors.select(connectors.hover(ref, null), null)}
            >
              <div
                className={cx([
                  'relative flex-col flex items-center',
                  {
                    'pt-8': enabled,
                  },
                ])}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
    </div>
    );
}