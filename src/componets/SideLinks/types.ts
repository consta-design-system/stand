export type Link = {
    label: string;
    href: string;
}

export type SideLinksItemDefault = {
    label: string;
    onClick: React.MouseEventHandler;
}

export type SideLinksProps<ITEM> = {
    items?: ITEM[];
    getItemLabel?: (item: ITEM) => string;
    getItemOnClick?: (item: ITEM) => React.MouseEventHandler;
    links?: Link[];
} & (ITEM extends { label: string | unknown } ? {} : {
    getItemLabel: (item: ITEM) => string;
});
