import React, {Component} from 'react';

const story = {
        title: "News Story Title",
        content: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.\n Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.\n Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.\n Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.\n"
    }
import {
    Row,
    Col,
    Button,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Card,
    CardHeader,
    CardFooter,
    CardBody,
    Collapse,
    Form,
    FormGroup,
    FormText,
    Label,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Alert
} from 'reactstrap';

class NewsStory extends Component {

    render(props) {
        return (
            <div className="animated fadeIn">
                    <div className="card">
                        <div className="card-header">
                            {story.title}
                        </div>
                        <div className="card-body">
                            <h1>{story.title}</h1>
                            {story.content}
                        </div>
                        <div className="card-footer">
                            Share via
                            <a style={{paddingLeft: "10px" }} href={"https://www.facebook.com/sharer/sharer.php?u="+ window.location.href.replace("#", "") } target="_blank">
                                <button className="btn-facebook"><span> facebook</span></button>
                            </a>
                            <a style={{ paddingLeft: "15px" }} href={"https://twitter.com/home?status=" + window.location.href.replace("#", "")} target="_blank">
                                <button className="btn-twitter"><span> twitter</span></button>
                            </a>
                            <a style={{ paddingLeft: "15px" }} href={"https://plus.google.com/share?url=" + window.location.href.replace("#", "")} target="_blank">
                                <button className="btn-google-plus"><span> google+</span></button>
                            </a>
                        </div>
                    </div>

                <Card>
                    <CardHeader>
                        <strong>Comments</strong>
                    </CardHeader>
                    <CardBody>
                        <Alert color="secondary">
                            <h5 className="alert-heading">alpersahistan</h5>
                            <p>
                                Aww yeah, you successfully read this important alert message. This example text is going
                                to run a bit longer so that you can see how spacing within an alert works with this kind
                                of content.
                            </p>
                        </Alert>
                        <hr />
                        <Alert color="secondary">
                            <h5 className="alert-heading">selimfirat</h5>
                            <p>
                                Aww yeah, you successfully read this important alert message. This example text is going
                                to run a bit longer so that you can see how spacing within an alert works with this kind
                                of content.
                            </p>
                        </Alert>
                        <hr/>

                        <Alert color="secondary">
                            <h5 className="alert-heading">orkunalpar</h5>
                            <p>
                                Aww yeah, you successfully read this important alert message. This example text is going
                                to run a bit longer so that you can see how spacing within an alert works with this kind
                                of content.
                            </p>
                        </Alert>
                        <hr />
                        <Alert color="secondary">
                            <h5 className="alert-heading">hakanturkmenoglu</h5>
                            <p>
                                Aww yeah, you successfully read this important alert message. This example text is going
                                to run a bit longer so that you can see how spacing within an alert works with this kind
                                of content.
                            </p>
                        </Alert>
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader>
                        <strong>Comment</strong> to this story
                    </CardHeader>
                    <CardBody>
                        <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                            <FormGroup row>
                                <Col md="3">
                                    <Label>Your Username</Label>
                                </Col>
                                <Col xs="12" md="9">
                                    <p className="form-control-static"><strong>selimfirat</strong></p>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="3">
                                    <Label htmlFor="textarea-input">Your Comment</Label>
                                </Col>
                                <Col xs="12" md="9">
                                    <Input type="textarea" name="textarea-input" id="textarea-input" rows="9"
                                           placeholder="Your comment goes here..."/>
                                </Col>
                            </FormGroup>
                        </Form>
                    </CardBody>
                    <CardFooter>
                        <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                        <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
                    </CardFooter>
                </Card>

            </div>
        )
    }
}

export default NewsStory;
