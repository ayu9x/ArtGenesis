// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ArtGenesisNFT
 * @dev ERC721 Token with URI storage and ERC2981 royalties support.
 */
contract ArtGenesisNFT is ERC721URIStorage, ERC2981, Ownable {
    uint256 private _nextTokenId;

    event NFTMinted(uint256 indexed tokenId, address indexed creator, string tokenURI, uint96 royaltyFeeNumerator);

    constructor() ERC721("ArtGenesis", "ARTG") Ownable(msg.sender) {
        // Token IDs start at 1
        _nextTokenId = 1;
    }

    /**
     * @dev Mints a new NFT with a specific URI and royalty configuration.
     * @param tokenURI The IPFS or centralized URI containing the metadata.
     * @param royaltyReceiver The address that will receive the royalty fees.
     * @param royaltyFeeNumerator The royalty fee in basis points (e.g., 500 = 5%).
     * @return The newly minted token ID.
     */
    function mint(
        string memory tokenURI,
        address royaltyReceiver,
        uint96 royaltyFeeNumerator
    ) external returns (uint256) {
        require(royaltyFeeNumerator <= 10000, "ERC2981: royalty fee will exceed salePrice");

        uint256 tokenId = _nextTokenId++;
        
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);

        if (royaltyReceiver != address(0) && royaltyFeeNumerator > 0) {
            _setTokenRoyalty(tokenId, royaltyReceiver, royaltyFeeNumerator);
        }

        emit NFTMinted(tokenId, msg.sender, tokenURI, royaltyFeeNumerator);

        return tokenId;
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721URIStorage, ERC2981)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
