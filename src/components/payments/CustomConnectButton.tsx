import { ConnectButton } from "@rainbow-me/rainbowkit";




export default function CustomConnectButton() {
    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
            }) => {
                // Note: If your app doesn't use authentication, you
                // can remove all 'authenticationStatus' checks
                const ready = mounted && authenticationStatus !== 'loading';
                const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus ||
                        authenticationStatus === 'authenticated');

                return (
                    <div
                        {...(!ready && {
                            'aria-hidden': true,
                            'style': {
                                opacity: 0,
                                pointerEvents: 'none',
                                userSelect: 'none',
                            },
                        })}
                    >
                        {(() => {
                            if (!connected) {
                                return (
                                    <button onClick={openConnectModal} type="button" className="bg-[#EF8F57] hover:bg-[#EF8F57]/90 w-full basis-1/2 cursor-pointer font-merriweather text-white rounded-md px-4 py-2 h-9 flex items-center justify-center ">
                                        Pay with Crypto
                                    </button>
                                );
                            }

                            if (chain.unsupported) {
                                return (
                                    <button onClick={openChainModal} type="button">
                                        Wrong network
                                    </button>
                                );
                            }

                            return (
                                <div
                                 className="bg-[#EF8F57] hover:bg-[#EF8F57]/90 w-full basis-1/2 cursor-pointer font-merriweather text-white  rounded-md px-4 py-2 h-9 flex items-center justify-center "
                                 >
                                    {/* <button
                                        onClick={openChainModal}
                                        style={{ display: 'flex', alignItems: 'center', cursor: "pointer" }}
                                        type="button"

                                    >
                                        {chain.hasIcon && (
                                            <div
                                                style={{
                                                    background: chain.iconBackground,
                                                    width: 12,
                                                    height: 12,
                                                    borderRadius: 999,
                                                    overflow: 'hidden',
                                                    marginRight: 4,
                                                }}
                                            >
                                                {chain.iconUrl && (
                                                    <img
                                                        alt={chain.name ?? 'Chain icon'}
                                                        src={chain.iconUrl}
                                                        style={{ width: 12, height: 12 }}
                                                    />
                                                )}
                                            </div>
                                        )}

                                    </button> */}

                                    <button onClick={openAccountModal} type="button" className="cursor-pointer" >
                                        {account.displayName}
                                    </button>
                                </div>
                            );
                        })()}
                    </div>
                );
            }}
        </ConnectButton.Custom>
    )
}