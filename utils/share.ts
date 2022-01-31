export const getSupportsShare = () => !!navigator.share

const share = (ShareData: ShareData) => navigator.share(ShareData)

export default share
