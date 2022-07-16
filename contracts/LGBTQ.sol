pragma solidity >=0.5.0;

contract LGBTQ {
    string public name = "LGBTQ"; //state variable

    //Store Image
    uint256 public imageCount = 0;
    mapping(uint256 => Image) public images; // uint variable will store the reference hash of image on ipfs

    struct Image {
        uint256 id; // non negative
        string hash; // location of ipfs
        string description; //description of image
        uint256 tipAmount; //amount to be rewarded
        address payable author; //address of the author of the image (celo address)
    }

    event ImageCreated(
        uint256 id,
        string hash,
        string description,
        uint256 tipAmount,
        address payable author
    );

    event ImageTipped(
        uint256 id,
        string hash,
        string description,
        uint256 tipAmount,
        address payable author
    );

    //Create Image
    function uploadImage(string memory _imgHash, string memory _description)
        public
    {
        //Make sure image hash exists
        require(bytes(_imgHash).length > 0);
        //Make sure image description is entered
        require(bytes(_description).length > 0);
        //Make sure uploader address exists
        require(msg.sender != address(0x0));
        // Increment image id
        imageCount++;
        // Add Image to contract
        images[imageCount] = Image(
            imageCount,
            _imgHash,
            _description,
            0,
            msg.sender
        );
        // Trigger an event
        emit ImageCreated(
            imageCount,
            _imgHash,
            _description,
            0,
            msg.sender
        );
    }

    
    function tipImageOwner(uint256 _id) public payable {
        
        require(_id > 0 && _id <= imageCount);
        
        Image memory _image = images[_id];
        
        address payable _author = _image.author;
        
        address(_author).transfer(msg.value);
        
        _image.tipAmount = _image.tipAmount + msg.value;
       
        images[_id] = _image;
        
        emit ImageTipped(
            _id,
            _image.hash,
            _image.description,
            _image.tipAmount,
            _author
        );
    }
}
