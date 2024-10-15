import React, { useState } from 'react';
import { View, Modal, Button, FlatList, StyleSheet, Text } from 'react-native';
import { Rating, Input } from 'react-native-elements';
import RenderCampsite from './RenderCampsite';
import { useDispatch } from 'react-redux';
import { postComment } from '../features/comments/commentsSlice'; 

const CampsiteInfoScreen = ({ campsite, comments, renderCommentItem }) => {
    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(5);
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');
    const dispatch = useDispatch();  

    const handleSubmit = () => {
        const newComment = {
            author,
            rating,
            text,
            campsiteId: campsite.id
        };
        dispatch(postComment(newComment));  
        setShowModal(false);  
    };

    const resetForm = () => {
        setRating(5);
        setAuthor('');
        setText('');
    };

    return (
        <>
            <RenderCampsite 
                campsite={campsite}
                onShowModal={() => setShowModal(true)}
            />

            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={(item) => item.id.toString()}
            />

            <Modal
                animationType='slide'
                transparent={true}
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modal}>
                    <Rating
                        showRating
                        startingValue={rating}
                        imageSize={40}
                        onFinishRating={(rating) => setRating(rating)}
                        style={{ paddingVertical: 10 }}
                    />

                    <Input
                        placeholder='Author'
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        leftIconContainerStyle={{ paddingRight: 10 }}
                        onChangeText={(text) => setAuthor(text)}
                        value={author}
                    />

                    <Input
                        placeholder='Comment'
                        leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                        leftIconContainerStyle={{ paddingRight: 10 }}
                        onChangeText={(text) => setText(text)}
                        value={text}
                    />

                    <View style={{ margin: 10 }}>
                        <Button
                            title='Submit'
                            color='#5637DD'
                            onPress={() => {
                                handleSubmit();
                                resetForm();
                            }}
                        />
                    </View>

                    <View style={{ margin: 10 }}>
                        <Button
                            title='Cancel'
                            color='#808080'
                            onPress={() => {
                                resetForm();
                                setShowModal(false);
                            }}
                        />
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        margin: 20
    }
});

export default CampsiteInfoScreen;
