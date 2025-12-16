declare module '*.svg' {
    import * as React from 'react';

    const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    export default ReactComponent;
}

declare module '*.svg?url' {
    const content: string;
    export default content;
}

declare module '*.svg?inline' {
    const content: string;
    export default content;
}
